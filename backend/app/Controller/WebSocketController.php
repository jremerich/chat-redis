<?php

declare(strict_types=1);

namespace App\Controller;

use Hyperf\SocketIOServer\Annotation\Event;
use Hyperf\SocketIOServer\Annotation\SocketIONamespace;
use Hyperf\SocketIOServer\BaseNamespace;
use Hyperf\SocketIOServer\Socket;
use Hyperf\Utils\Codec\Json;

#[SocketIONamespace("/")]
class WebSocketController extends BaseNamespace
{
  /**
   * @param string $data
   */
  #[Event("join-room")]
  public function onJoinRoom(Socket $socket, $data)
  {
    $room = $data['room'];
    $socket->join($room);

    // Push to other users in the room (excluding the current user)
    $payload = [
      'count' => count($socket->getAdapter()->clients($room)),
      'user' => [
        'id' => $socket->getSid(),
        'name' => $data['name'],
      ],
      'users' => $socket->getAdapter()->clients($room),
    ];
    $socket->to($room)->emit('new-user', $payload);

    // Broadcast to everyone in the room (including the current user)
    // $this->emit('new-user', json_encode($payload));

    // return all users to current user
    $lisAllConnectedUsers = Json::encode($payload);
    return $lisAllConnectedUsers;
  }

  /**
   * @param string $data
   */
  #[Event("say")]
  public function onSay(Socket $socket, $data)
  {
    $data = Json::decode($data);
    $message = [
      "id" => $data['id'],
      "from" => $socket->getSid(),
      "content" => $data['content'],
    ];

    // Push to other users in the room (excluding the current user)
    $socket->to($data['room'])->emit('chat', $message);
    return $message;
  }
}

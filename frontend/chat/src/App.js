import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import {Box,Heading,Text,Input,Button} from "@chakra-ui/react"
import Chat from "./components/Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <Box width="100%" m="auto"  className="joinChatContainer" >
          <Heading size={{lg:"3xl",base:"xl"}} m="auto" textAlign="center">"Get connected to your helping hands"</Heading>
          <Box className="inp" p={5} border="1px solid #e97122" borderRadius="10px" width={{lg:"30%",base:"100%"}}  m="auto" >

          <Text>Enter your username</Text>
          <Input
            type="text"
            placeholder="Username"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />.
           <Text>Enter the room id sent to your mail</Text>
          <Input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <Box width="100%"  mt="20px">
          <button className="disbut" onClick={joinRoom}>Start Discussion </button>
          </Box>
          </Box>
        </Box>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;

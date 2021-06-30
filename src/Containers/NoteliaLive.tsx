import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Components/Loader/Loader";
import CodeMirrorEditor from "./LiveCollaboration/CodeMirrorLive";

interface Props {}

const NoteliaLive: React.FC<Props> = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [roomExists, setStatus] = useState<any>(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkRoom = async () => {
      try {
        await axios.get(
          `https://notelia-server.eu-gb.cf.appdomain.cloud/${roomId}`
        );
        setStatus(true);
        setTimeout(() => {
          setLoading(false);
        }, 300);
      } catch (err) {
        alert("Room doesn't exist. Please join through Notelia's website");
        setLoading(false);
      }
    };
    checkRoom();
  }, [roomId]);
  return loading ? <Loader /> : roomExists ? <CodeMirrorEditor /> : null;
};

export default NoteliaLive;

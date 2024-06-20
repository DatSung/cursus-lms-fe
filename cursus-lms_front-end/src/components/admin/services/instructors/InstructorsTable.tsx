import SignalRService from "../../../../utils/signalR/signalRService.ts";
import {useEffect, useState} from "react";


const InstructorsTable = () => {
    const [message, setMessage] = useState<string>("");

    useEffect(() => {

        SignalRService.on("ReceiveMessage", (receivedMessage: string) => {
            setMessage(receivedMessage);
        });
    }, []);

    return (
        <div>
            <h1>SignalR with React and TypeScript</h1>
            <p>{message}</p>
        </div>
    );
};

export default InstructorsTable;
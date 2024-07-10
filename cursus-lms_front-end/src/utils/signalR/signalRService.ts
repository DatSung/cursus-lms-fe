import * as signalR from "@microsoft/signalr";
import {getJwtTokenSession} from "../../auth/auth.utils.tsx";

class SignalRService {
    private connection: signalR.HubConnection;

    constructor() {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(`https://cursuslms.azurewebsites.net/hubs/notification`,
                {
                    accessTokenFactory(): string | Promise<string> {
                        return getJwtTokenSession().accessToken || "";
                    }
                }) // URL of SignalR Hub
            .withAutomaticReconnect()
            .configureLogging(signalR.LogLevel.Information)
            .build();

        this.connection.onreconnected((connectionId) => {
            console.log(`Reconnected: ${connectionId}`);
        });

        this.connection.onclose((error) => {
            console.log(`Connection closed due to error: ${error}`);
        });
    }

    public startConnection = async () => {
        try {
            await this.connection.start();
            console.log("Connected to SignalR Hub");
        } catch (error) {
            console.log(`Error while establishing connection: ${error}`);
            setTimeout(this.startConnection, 5000);
        }
    };

    public stopConnection = async () => {
        try {
            await this.connection.stop();
            console.log("Disconnected from SignalR Hub");
        } catch (error) {
            console.log(`Error while stopping connection: ${error}`);
        }
    };

    public on = (methodName: string, newMethod: (...args: any[]) => void) => {
        this.connection.on(methodName, newMethod);
    };

    public off = (methodName: string, method: (...args: any[]) => void) => {
        this.connection.off(methodName, method);
    };

    public invoke = async (methodName: string, ...args: any[]) => {
        try {
            await this.connection.invoke(methodName, ...args);
        } catch (error) {
            console.error(`Error while invoking ${methodName}: ${error}`);
        }
    };
}

export default new SignalRService();

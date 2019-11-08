import { Application } from "express";

export default interface Server{
    port: number | string;
    host: string;
    app:  Application;
    server: any;
    socket:any;
}
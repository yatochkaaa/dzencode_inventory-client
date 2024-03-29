import { format } from "date-fns";
import { ru } from "date-fns/locale";
import React from "react";
import { Clock } from "react-bootstrap-icons";
import io from "socket.io-client";

const TopMenu: React.FC = () => {
  const [dateTime, setDateTime] = React.useState(new Date());
  const [activeSessions, setActiveSessions] = React.useState(0);

  React.useEffect(() => {
    const socket = io("http://localhost:3001", {
      transports: ["websocket"],
    });

    socket.on("activeSessionsUpdate", (count: number) => {
      setActiveSessions(count);
    });

    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => {
      socket.disconnect();
      clearInterval(interval);
    };
  }, []);

  const formattedTopMenuDate = (date: Date) => {
    const formattedDate = format(date, "dd MMM yyyy", { locale: ru });
    const parts = formattedDate.split(" ");

    parts[1] = parts[1].charAt(0).toUpperCase() + parts[1].slice(1);
    parts[1] = parts[1].replace(".", ",");

    return parts.join(" ");
  };

  const formattedTime = format(dateTime, "HH:mm");

  return (
    <div className="d-flex flex-column align-items-end">
      <div>
        <div className="d-flex align-items-center">
          <div className="me-4">{formattedTopMenuDate(dateTime)}</div>
          <Clock className="me-2" fill="#80b444" />
          <div>{formattedTime}</div>
        </div>
        <div>Активные сессии: {activeSessions}</div>
      </div>
    </div>
  );
};

export default TopMenu;

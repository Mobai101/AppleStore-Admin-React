import React, { useEffect, useState } from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import "./Chat.css";
import io from "socket.io-client";
import ChatRoomsAPI from "../../API/ChatRoomsAPI";

const socket = io("https://tranledong-applestore-backend.onrender.com", {
  transports: ["websocket"],
});

function Chat(props) {
  const [allRoom, setAllRoom] = useState([]);
  const [roomId, setRoomId] = useState("");
  const [message, setMessage] = useState([]);
  const [load, setLoad] = useState(false);
  const [textMessage, setTextMessage] = useState("");

  const onChangeText = (e) => {
    setTextMessage(e.target.value);
  };

  // Hàm này dùng để tìm ra những user khác với admin
  useEffect(() => {
    const fetchData = async () => {
      const result = await ChatRoomsAPI.getAllRoom();
      setAllRoom(result);
    };
    fetchData();

    // socket to receive data when new room is created
    socket.on("new_room_created", (data) => {
      fetchData();
    });

    // socket to receive data when room is closed
    socket.on("end_room", (data) => {
      fetchData();
    });
  }, []);

  // Hàm này dùng để load dữ liệu message và nó sẽ chạy lại khi state id_user2 thay đổi
  // Tức là khi admin chọn người dùng mà admin muốn chat thì state id_user2 sẽ thay đổi
  // để gọi lại hàm này
  useEffect(() => {
    if (roomId) {
      const fetchData = async () => {
        const result = await ChatRoomsAPI.getMessageByRoomId(roomId);
        setMessage(result.chat || []);
      };
      fetchData();
    }
  }, [roomId]);

  // Đây là hàm lấy dữ liệu từ api dựa vào state load
  // Dùng để load lại tin nhắn khi có socket từ server gửi tới
  useEffect(() => {
    if (load) {
      const fetchData = async () => {
        const result = await ChatRoomsAPI.getMessageByRoomId(roomId);
        setMessage(result.chat || []);
      };
      fetchData();

      setLoad(false);
    }
  }, [load]);

  //Hàm này dùng để nhận socket từ server gửi lên
  useEffect(() => {
    //Nhận dữ liệu từ server gửi lên thông qua socket với key receive_message
    socket.on("receive_message", (data) => {
      //Sau đó nó sẽ setLoad gọi lại hàm useEffect lấy lại dữ liệu
      setLoad(true);
    });
  }, []);

  // Hàm này dùng để gửi tin nhắn cho khách hàng
  const handlerSend = () => {
    if (!roomId) {
      return;
    }

    const data = {
      message: textMessage,
      roomId: roomId,
      is_admin: true,
    };

    const postData = async () => {
      await ChatRoomsAPI.addMessage(data);
    };

    postData();
    setTextMessage("");
    setTimeout(() => {
      socket.emit("send_message", data);
      setLoad(true);
    }, 200);
  };

  const handleRoomChange = (roomId) => {
    setRoomId(roomId);
  };

  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="row no-gutters">
                <div className="col-lg-3 col-xl-2 border-right">
                  <div className="card-body border-bottom">
                    <form>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Search Contact"
                      />
                    </form>
                  </div>
                  <div
                    className="scrollable position-relative"
                    style={{ height: "calc(90vh - 111px)" }}
                  >
                    <ul className="mailbox list-style-none">
                      <li className="li-message-center">
                        <div className="message-center">
                          {allRoom &&
                            allRoom.map((value) => (
                              <a
                                key={`${
                                  value.message
                                }-${new Date().valueOf()}-${(Math.random() + 1)
                                  .toString(36)
                                  .substring(7)}`}
                                onClick={() => handleRoomChange(value._id)}
                                className="message-item d-flex align-items-center border-bottom px-3 py-2 active_user"
                              >
                                <div className="user-img">
                                  {" "}
                                  <img
                                    src="https://img.icons8.com/color/36/000000/administrator-male.png"
                                    alt="user"
                                    className="img-fluid rounded-circle"
                                    width="40px"
                                  />{" "}
                                  <span className="profile-status away float-right"></span>
                                </div>
                                <div className="w-75 d-inline-block v-middle pl-2">
                                  <h6 className="message-title mb-0 mt-1">
                                    {value.user.fullName}
                                  </h6>
                                  <p className="message-title mb-0 mt-1">
                                    {value._id}
                                  </p>
                                </div>
                              </a>
                            ))}
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-9  col-xl-10">
                  <div
                    className="chat-box scrollable position-relative"
                    style={{ height: "calc(93vh - 111px)" }}
                  >
                    <ul className="chat-list list-style-none px-3 pt-3">
                      {/* messages -------------------------------------------------------------- */}
                      {message &&
                        message.map((value) =>
                          value.is_admin ? (
                            <li
                              className="chat-item admin-chat odd mt-3"
                              key={`${value.message}-${new Date().valueOf()}-${(
                                Math.random() + 1
                              )
                                .toString(36)
                                .substring(7)}`}
                            >
                              <div className="chat-content d-inline-block">
                                <div className="box msg p-2 d-inline-block">
                                  You: {value.message}
                                </div>
                                <br />
                              </div>
                            </li>
                          ) : (
                            <li
                              className="chat-item mt-3"
                              key={`${value.message}-${new Date().valueOf()}-${(
                                Math.random() + 1
                              )
                                .toString(36)
                                .substring(7)}`}
                            >
                              <div className="chat-img d-inline-block">
                                <img
                                  src="https://img.icons8.com/color/36/000000/administrator-male.png"
                                  alt="user"
                                  className="rounded-circle"
                                  width="45"
                                />
                              </div>
                              <div className="chat-content d-inline-block">
                                <div className="msg client-chat p-2 d-inline-block">
                                  Client: {value.message}
                                </div>
                              </div>
                              <div className="chat-time d-block font-10 mt-1 mr-0 mb-3"></div>
                            </li>
                          )
                        )}
                    </ul>
                  </div>
                  <div className="card-body border-top">
                    <div className="row">
                      <div className="col-9">
                        <div className="input-field mt-0 mb-0">
                          <input
                            id="textarea1"
                            placeholder="Type and enter"
                            className="form-control border-0"
                            type="text"
                            onChange={onChangeText}
                            value={textMessage}
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                handlerSend();
                              }
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-3 sendBtn">
                        <a
                          className="float-right text-white"
                          onClick={handlerSend}
                        >
                          <RiSendPlaneFill />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer text-center"></footer>
    </div>
  );
}

export default Chat;

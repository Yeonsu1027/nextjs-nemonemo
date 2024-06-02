export const Message = ({ message }) => {
  return (
    <div className="msg_box">
      <img src="/img/boy.png" alt="아이" width="50px" />
      <p className="game_msg">{message}</p>
    </div>
  );
};

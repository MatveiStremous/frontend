import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Registration() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");
  const [message, setMessage] = React.useState("");
  const Navigate = useNavigate();

  const newUser = {
    name: name,
    email: email,
    password: password,
  };

  const onRegistration = async (obj) => {
    try {
      if (password === password2) {
        console.log(obj);
        const answer = await axios.post(
          "http://localhost:8088/registration",
          obj
        );
        console.log(answer.data);
        if (answer.data) {
          Navigate("/login");
        } else {
          setMessage("Данный email занят!");
        }
      } else {
        setMessage("Пароли не совпадают! Попробуйте снова!");
        setPassword("");
        setPassword2("");
      }
    } catch (error) {
      alert("Не удалось зарегистрироваться");
    }
  };

  return (
    <div className="content p-40">
      <form onSubmit={() => onRegistration(newUser)}>
        <div>
          <input
            required
            onChange={(obj) => setName(obj.target.value)}
            value={newUser.name}
            placeholder="Иван"
          />
          <p></p>
          <input
            required
            onChange={(obj) => setEmail(obj.target.value)}
            value={newUser.email}
            type="email"
            placeholder="Ivanov@mail.ru"
          />
          <p></p>
          <input
            minLength={6}
            required
            onChange={(obj) => setPassword(obj.target.value)}
            value={newUser.password}
            type="password"
            placeholder="Your password"
          />
          <p></p>
          <input
            minLength={6}
            required
            onChange={(obj) => setPassword2(obj.target.value)}
            value={password2}
            type="password"
            placeholder="Enter your password one more time"
          />
        </div>
        <p></p>
        <input type="submit" value="Зарегистрироваться"/>
        <h3>{message && `${message}`}</h3>
      </form>
    </div>
  );
}

export default Registration;

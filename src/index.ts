import { EventTypes, Message } from "chat-models";

(() => {
  "use strict";

  let name = "timigen"; // prompt("screen name", "joe-blow");

  const wsIp = "192.168.1.7";
  const wsPort = 1337;
  const wsAddress = `${wsIp}:${wsPort}`;

  const body = document.getElementsByTagName("body")[0];
  const content = document.getElementById("content");
  const controls = document.getElementById("controls");
  const input = document.getElementById("input") as HTMLInputElement;
  const status = document.getElementById("status");

  const height = body.clientHeight;
  const width = body.clientWidth;

  const contentHeight = Math.floor(height * 0.85);

  content.setAttribute(
    "style",
    `top: 2px; left: 2px; right: 2px; bottom: ${height - contentHeight}px;`
  );

  controls.setAttribute(
    "style",
    `top: ${contentHeight}px; left: 2px; right: 2px; bottom: ${22}px;`
  );

  input.setAttribute(
    "style",
    `width: ${width - 4}px;height: ${height - contentHeight - 24}px;`
  );

  status.setAttribute(
    "style",
    `top: ${height -
      22}px; left: 0; right: 0; bottom: 0;background-color: #29b3d2;`
  );
  status.innerText = `connecting to ${wsAddress}`;

  // if browser doesn't support WebSocket, just show
  // some notification and exit
  if (!window.WebSocket) {
    content.innerHTML = `<p>browser does not support WebSocket.</p>`;

    status.style.backgroundColor = "red";
    status.innerText = "error: unsupported";

    input.hidden = true;
    return;
  }

  // open connection
  let connection = new WebSocket("ws://" + wsAddress);
  connection.onopen = () => {
    status.style.backgroundColor = "green";
    // status.style.padding = "5px";
    status.innerText = "connected to " + wsAddress;

    input.disabled = false;
    input.value = "";
  };

  connection.onerror = error => {
    // there were some problems with connection...
    content.innerHTML = `<p>problem with your connection or the server is down.</p>`;
    status.style.backgroundColor = "red";
    status.innerText = "connection error!";
  };

  // incoming messages
  connection.onmessage = message => {
    let json;

    try {
      json = JSON.parse(message.data);
    } catch (e) {
      console.error("invalid JSON: ", message.data);
      return;
    }

    if (json.type === EventTypes.Join) {
      // entire message history
      // WRITE every message to the chat window
      for (let i = 0; i < json.room.events.length; i++) {
        let target = json.room.events[i];
        // target.rendered = new Date().toISOString();
        addMessage(target.data);
      }
    } else if (json.type === EventTypes.Message) {
      // it's a single message
      // let the user write another message
      input.disabled = false;
      let current = json.data;
      addMessage(current);
    } else {
      console.log("UNKNOWN TYPE", json);
    }
  };

  /**
   * Send message when user presses Enter key
   */
  input.addEventListener("keydown", e => {
    if (e.keyCode === 13) {
      let msg = input.value;
      if (!msg) {
        return;
      }

      const message = {
        author: name,
        color: "blue",
        text: msg
      };
      // send the message as an ordinary text
      connection.send(JSON.stringify({ type: "message", data: message }));

      // disable the input field to make the user wait until server
      // sends back response
      input.disabled = true;
      input.value = "";
    }
  });

  /**
   * Add message to the chat window
   */
  function addMessage(message: Message) {
    content.innerHTML =
      content.innerHTML +
      `<p><span>${message.author}</span>:<span>${message.text}</span></p>`;

    scrollToBottom("content");
  }

  function scrollToBottom(id: string) {
    const div = document.getElementById(id);
    div.scrollTop = div.scrollHeight - div.clientHeight;
  }
})();

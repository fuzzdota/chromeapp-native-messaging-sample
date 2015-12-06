/*
* @Author: thngo
* @Date:   2015-12-02 14:32:06
* @Last Modified by:   thngo
* @Last Modified time: 2015-12-04 17:06:42
 */

package main

import (
	"bufio"
	"bytes"
	"encoding/binary"
	"encoding/json"
	"fmt"
	"os"
	"time"
)

type Message struct {
	Text string
}

func main() {
	log("Application Started")
	read()
}

func log(msg string) {
	f, _ := os.OpenFile("nativetext_log.txt", os.O_CREATE|os.O_APPEND|os.O_WRONLY, 0600)
	s := fmt.Sprintf("%v:%v\n", time.Now().Format(time.RFC850), msg)
	f.WriteString(s)
}

func read() {
	for {
		s := bufio.NewReader(os.Stdin)
		length := make([]byte, 4)
		s.Read(length)
		lengthNum := readMessageLength(length)
		content := make([]byte, lengthNum)
		s.Read(content)
		echoMessage(content)
	}
}

func echoMessage(msg []byte) {
	content := decodeMessage(msg)
	if content == "Hi" {
		send("Oh hello there!")
	} else {
		send(content)
	}
}

func send(msg string) {
	byteMsg := encodeMessage(msg)
	var msgBuf bytes.Buffer
	writeMessageLength(byteMsg)
	msgBuf.Write(byteMsg)
	msgBuf.WriteTo(os.Stdout)
}

func decodeMessage(msg []byte) string {
	var aMessage Message
	json.Unmarshal(msg, &aMessage)
	return aMessage.Text
}

func encodeMessage(msg string) []byte {
	message := Message{
		Text: msg,
	}
	return dataToBytes(message)
}

func dataToBytes(msg Message) []byte {
	byteMsg, _ := json.Marshal(msg)
	return byteMsg
}

func writeMessageLength(msg []byte) {
	binary.Write(os.Stdout, binary.LittleEndian, uint32(len(msg)))
}

func readMessageLength(msg []byte) int {
	var length uint32
	buf := bytes.NewBuffer(msg)
	binary.Read(buf, binary.LittleEndian, &length)
	return int(length)
}

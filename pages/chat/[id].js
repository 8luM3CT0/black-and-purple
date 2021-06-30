import Head from 'next/head'
//frontend components
import Sidebar from '../../components/sidebar/Sidebar'
import ChatPage from '../../components/feed/ChatPage'
import styled from 'styled-components'
//backend components
import { auth, store } from '../../firebase'
import firebase from 'firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import getUser from '../../utilities/getUser'

function Chat ({ chat, messages }) {
  const [user] = useAuthState(auth)

  return (
    <div className='flex'>
      <Head>
        <title>Talk with {getUser(chat.users, user)}</title>
      </Head>
      <Sidebar />
      <ChatArea>
        {/**ChatPage */}
        <ChatPage chat={chat} messages={messages} />
      </ChatArea>
    </div>
  )
}

export default Chat

const ChatArea = styled.div`
  flex: 1;
  overflow: scroll;
  height: 100vh;
  background-color: rgb(31, 41, 55);

  ::-webkit-scrollbar {
    display: none;
  }
`

export async function getServerSideProps (context) {
  const ref = store.collection('chats').doc(context.query.id)

  //Prepare the message server-side
  const messagesRes = await ref
    .collection('messages')
    .orderBy('timestamp', 'asc')
    .get()

  const messages = messagesRes.docs
    .map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    .map(messages => ({
      ...messages,
      timestamp: messages.timestamp.toDate().getTime()
    }))

  //PREP the chats
  const chatRes = await ref.get()
  const chat = {
    id: chatRes.id,
    ...chatRes.data()
  }

  return {
    props: {
      messages: JSON.stringify(messages),
      chat: chat
    }
  }
}

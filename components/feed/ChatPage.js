//front-end components
import {
  ArrowLeftIcon,
  UserAddIcon,
  PhoneIcon,
  VideoCameraIcon,
  PhotographIcon,
  ReplyIcon,
  EmojiHappyIcon,
  DotsHorizontalIcon
} from '@heroicons/react/outline'
import { Avatar } from '@material-ui/core'
import TimeAgo from 'timeago-react'
import Message from './Message'
import styled from 'styled-components'
//back-end components
import { useRouter } from 'next/router'
import { auth, store } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import getUser from '../../utilities/getUser'
import firebase from 'firebase'
import { useRef, useState } from 'react'

function ChatPage ({ chat, messages }) {
  const [user] = useAuthState(auth)
  const [input, setInput] = useState('')
  const endOfChatRef = useRef(null)
  const router = useRouter()
  const [messagesSnapshot] = useCollection(
    store
      .collection('chats')
      .doc(router.query.id)
      .collection('messages')
      .orderBy('timestamp', 'asc')
  )
  const [receiverSnapshot] = useCollection(
    store.collection('users').where('email', '==', getUser(chat.users, user))
  )

  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map(message => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message
              .data()
              .timestamp?.toDate()
              .getTime()
          }}
        />
      ))
    } else {
      return JSON.parse(messages).map(message => (
        <Message key={message.id} user={message.user} message={message} />
      ))
    }
  }

  const scrollToBottom = () => {
    endOfChatRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  const sendToUser = e => {
    e.preventDefault()

    //updates last seen
    store
      .collection('users')
      .doc(user.uid)
      .set(
        {
          lastSeen: firebase.firestore.FieldValue.serverTimestamp()
        },
        { merge: true }
      )

    store
      .collection('chats')
      .doc(router.query.id)
      .collection('messages')
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: input,
        user: user.email,
        photoURL: user.photoURL
      })
    setInput('')
    scrollToBottom()
  }

  const goHome = () => {
    router.push('/')
  }

  const receiver = receiverSnapshot?.docs?.[0]?.data()
  const userEmail = getUser(chat.users, user)

  return (
    <div>
      {/**header */}
      <div
        className='
      sticky
      z-50
      top-0
      items-center
      justify-between
      flex
      h-24
      p-2.5
      bg-gray-800
      border-b-4
      border-indigo-500
      '
      >
        {/**BackIcon -> router.push('/') */}
        <ArrowLeftIcon className='chatIcon' onClick={goHome} />
        {/**UserDetails */}
        <div className='flex items-center'>
          {/**UserPic */}
          {receiver ? (
            <Avatar
              src={receiver?.photoURL}
              className='rounded-full cursor-pointer mr-3 h-14 w-14'
              layout='fixed'
            />
          ) : (
            <Avatar>{userEmail[0]}</Avatar>
          )}
          <div className='grid items-center'>
            <div className='flex items-center justify-evenly mb-1'>
              {/**h3 -> username */}
              <h3 className='text-gray-200 font-semibold xl:text-lg sm:text-base'>
                {receiver?.displayName}
              </h3>
            </div>
            {receiverSnapshot ? (
              <span className='font-medium text-gray-400 hover:text-gray-200 xl:text-lg sm:text-base'>
                {receiver?.lastSeen?.toDate() ? (
                  <TimeAgo datetime={receiver?.lastSeen?.toDate()} />
                ) : (
                  'Unavailable'
                )}
              </span>
            ) : (
              <span className='font-medium text-gray-400 hover:text-gray-200'>
                loading...
              </span>
            )}
          </div>
        </div>
        <div className='flex items-center mr-5 '>
          <UserAddIcon className='chatIcon__right' />
          <PhoneIcon className='chatIcon__right' />
          <VideoCameraIcon className='chatIcon__right' />
        </div>
      </div>
      {/**feed */}
      <div className='items-center h-5/6 p-8'>
        {showMessages()}
        <div className='p-3' ref={endOfChatRef} />
      </div>
      {/**input sending */}
      <FormArea>
        <div
          className='
          items-center
          mr-2
          pt-3
        '
        >
          <PhotographIcon className='photograph' />
        </div>
        <input
          className='
          p-2
        text-white
        placeholder-gray-400
        bg-transparent
        outline-none 
        flex-1'
          placeholder='Type a message and hit send'
          type='text'
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button hidden disabled={!input} onClick={sendToUser} type='submit'>
          Submit
        </button>
        <div className='mr-2 flex items-center'>
          {/**SendIcon */}
          <ReplyIcon className='chatSend' onClick={sendToUser} />
          {/** EmojiIcon*/}
          <EmojiHappyIcon className='chatSend' />
          <DotsHorizontalIcon className='chatSend' />
        </div>
      </FormArea>
    </div>
  )
}

export default ChatPage

const FormArea = styled.form`
  display: flex;
  border-top: 4px solid #6841d4;
  background-color: rgb(31, 41, 55);
  align-items: center;
  justify-content: space-evenly;
  height: 86px;
  padding: 10px;
  bottom: 0;
  position: sticky;
  z-index: 100;
  margin-top: 20px;
`

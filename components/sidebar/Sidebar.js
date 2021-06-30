import {
  ChatIcon,
  UsersIcon,
  MenuIcon,
  PencilAltIcon
} from '@heroicons/react/outline'
//email validator
import * as EmailChecker from 'email-validator'
//backend components
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import { auth, store } from '../../firebase'
import Chat from './Chat'

function Sidebar () {
  const [user] = useAuthState(auth)
  const userChatRef = store
    .collection('chats')
    .where('users', 'array-contains', user.email)
  const [chatSnapshot] = useCollection(userChatRef)

  const signOut = () => {
    auth.signOut()
  }

  const chatExists = receiver =>
    !!chatSnapshot?.docs.find(
      chat => chat.data().users.find(user => user === receiver)?.length > 0
    )

  const addUser = () => {
    const input = prompt('Enter a user you would like to chat with: ')

    if (!input) return null

    if (
      EmailChecker.validate(input) &&
      !chatExists(input) &&
      input !== user.email
    ) {
      store.collection('chats').add({
        users: [user.email, input]
      })
    }
  }

  return (
    <div
      className='
    flex
    h-screen 
    flex-col 
    sm:w-48
    xl:w-96  
    bg-purple-500'
    >
      {/**SidebarHeader */}
      <div
        className='
        flex
        items-center
        p-2
        justify-evenly
        '
      >
        {/**Sidebar icons */}
        <ChatIcon className='icon' />
        <UsersIcon className='icon' />
        <MenuIcon className='icon' />
        <PencilAltIcon onClick={addUser} className='icon' />
      </div>
      <div
        className='
        mt-7
        flex
        items-center
        p-5
        sm:p-1
      '
      >
        <img
          onClick={signOut}
          src={user?.photoURL}
          alt=''
          className='rounded-full cursor-pointer mr-4'
          width='60'
          height='60'
          layout='fixed'
        />
        <input
          placeholder='Search...'
          className='
        p-2
        text-white
        placeholder-white
        bg-transparent
        outline-none 
        border-b-2
        xl:w-60 
        sm:flex-shrink
        sm:w-20
        '
          type='text'
        />
      </div>
      {chatSnapshot?.docs.map(chat => (
        <Chat key={chat.id} id={chat.id} users={chat.data().users} />
      ))}
    </div>
  )
}

export default Sidebar

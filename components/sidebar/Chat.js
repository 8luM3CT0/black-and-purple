//frontend developement
import { UserIcon } from '@heroicons/react/outline'
import TimeAgo from 'timeago-react'
//backend dev
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import { auth, store } from '../../firebase'
import { useRouter } from 'next/router'
import getUser from '../../utilities/getUser'

function Chat ({ id, users }) {
  const [user] = useAuthState(auth)
  const [receiverSnapshot] = useCollection(
    store.collection('users').where('email', '==', getUser(users, user))
  )

  const enterChat = () => {
    router.push(`/chat/${id}`)
  }

  const receiver = getUser(users, user)
  const userPic = receiverSnapshot?.docs?.[0]?.data()
  const router = useRouter()

  return (
    <div
      onClick={enterChat}
      className='
        flex
        items-center
        cursor-pointer
        p-3.5
        break-words
        '
    >
      {receiver ? (
        <img
          src={userPic?.photoURL}
          className='rounded-full cursor-pointer mr-3'
          width='60'
          height='60'
          layout='fixed'
        />
      ) : (
        <img>{userPic[0]}</img>
      )}
      <div className='grid items-center'>
        <h4 className='font-semibold text-gray-300 hover:text-gray-100 sm:flex-shrink sm:font-small'>
          {userPic?.displayName}
        </h4>
        {receiverSnapshot ? (
          <p className='font-medium text-gray-400 hover:text-gray-200 sm:flex-shrink sm:font-small'>
            {userPic?.lastSeen?.toDate() ? (
              <TimeAgo datetime={userPic?.lastSeen?.toDate()} />
            ) : (
              'Unavailable'
            )}
          </p>
        ) : (
          <p className='font-medium text-gray-400 hover:text-gray-200'>
            loading...
          </p>
        )}
      </div>
    </div>
  )
}

export default Chat

{
  /**<p className='font-medium text-gray-400 hover:text-gray-200'>
          
        </p> */
}

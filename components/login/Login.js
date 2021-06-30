import { auth, provider } from '../../firebase'

function Login () {
  const signIn = () => {
    auth.signInWithPopup(provider).catch(alert)
  }
  return (
    <div
      className='
        grid
        h-screen
        place-items-center
        bg-gray-100
        '
    >
      <div
        className='
            flex-column
            text-center
            py-32
            px-48
            items-center
            bg-indigo-300
            rounded-md
            shadow-md
            '
      >
        <img
          src='https://cdn.iconscout.com/icon/free/png-512/viber-1653086-1402374.png'
          height={400}
          width={400}
          objectFit='contain'
        />
        <h2
          onClick={signIn}
          className='
                text-xl
                font-medium
                rounded-md
                bg-purple-700
                text-white
                text-center
                cursor-pointer
                p-5
                mt-7
                '
        >
          Please sign in with the button below
        </h2>
      </div>
    </div>
  )
}

export default Login

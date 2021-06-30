function Welcome () {
  return (
    <div
      className='
        flex-1
        h-screen
        grid
        place-items-center
        bg-gray-800
        '
    >
      <div
        className='
            border-1-purple-500
            bg-purple-600
            rounded-xl
            grid
            text-center
            xl:px-40
            xl:py-20
            sm:px-6
            sm:py-5
            items-center
            '
      >
        <h1
          className='
                font-medium
                text-gray-100
                text-xl
                '
        >
          Welcome!
        </h1>
        <h2
          className='
          font-normal
          text-gray-400
          text-base
        '
        >
          To start, add a user by pressing on the far right icon at the header &
          then type in the new user
        </h2>
      </div>
    </div>
  )
}

export default Welcome

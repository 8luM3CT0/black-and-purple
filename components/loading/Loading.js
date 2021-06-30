import { Circle } from 'better-react-spinkit'

function Loading () {
  return (
    <center
      style={{
        display: 'grid',
        placeItems: 'center',
        height: '100vh'
      }}
    >
      <div>
        <img
          src='https://cdn.iconscout.com/icon/free/png-512/viber-1653086-1402374.png'
          alt=''
          style={{ marginBottom: 10 }}
          height={200}
        />
      </div>
      <Circle color='#665cac' size={60} />
    </center>
  )
}

export default Loading

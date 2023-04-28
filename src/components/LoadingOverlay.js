import PuffLoader from 'react-spinners/PuffLoader'

function LoadingOverlay() {
  return (
    <div style={{ 
      width: '100%', height: '100%', zIndex: 999, 
      background: 'rgba(0,0,0,0.2)',
      display: 'grid', placeItems: 'center',
      position: 'fixed',
      top: 0, left: 0
    }}>
      <PuffLoader 
        color="#36d7b7" 
        size={ 100 }
      />
      
    </div>
  )
}

export default LoadingOverlay
import { NavBar } from '../components/NavBar'
import { LinesChart } from '../components/Charts/LinesChart'
import { Pies } from '../components/Charts/PiesChart'
function Charts () {
  return (
    <div>
      <NavBar />
      <h1 className='text-center'>Métricas</h1>
      <div>
        <p className='m-2 text-center'><b>Cantidad de visitantes </b></p>
        <div className='bg-light mx-auto px-2 border border-2 border-primary' style={{ width: '350px', height: '200px' }}>
          <LinesChart />
        </div>
      </div>
      <hr className='mt-3 mb-2' />
      <div>
        <p className='m-2 text-center'><b>Edades: </b> </p>
        <div className='bg-light mx-auto border border-2 border-primary' style={{ width: '350px', height: '200px' }}>
          <div style={{ width: '100%', height: '100%', padding: '10px 0' }}>
            <Pies />
          </div>
        </div>
      </div>
      <hr className='mt-3 mb-2' />
    </div>
  )
}

export default Charts


import List from '@/components/CalculationList'
import SaveFrom from '@/components/CalculationSaveForm'
import CalculatorButton from '@/components/CalculatorButton'
import CalculatorComponent from '@/components/CalculatorComponent'
import Image from 'next/image'
import Header from '@/components/Header'
import AuthProvider from '@/context/AuthProvider'
import CalculationProvider from '@/context/CalculationProvider'

export default function Home() {
  return (
    <main className="flex items-start px-16 py-4 justify-center gap-16 flex-wrap">
      <AuthProvider>
        <Header/>
      </AuthProvider>
      <CalculationProvider>
        <div className='max-w-[350px]'>
          <h2 className='text-4xl mb-4'>Calculator</h2>
          <CalculatorComponent/>
          <h2 className='text-2xl mt-2'>
            Calculation Name
          </h2>
          <AuthProvider>
            <SaveFrom/>
          </AuthProvider>
        </div>
      
      <div>
        <h2 className='text-4xl mb-4'>Your Calculations</h2>
        <List/>
      </div>
      </CalculationProvider>
    </main>
  )
}

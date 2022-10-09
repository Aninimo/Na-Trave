import { addDays, subDays, format, formatISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { ArrowRight, ArrowLeft } from 'phosphor-react'

export function DataSelect({ currentDate, onChange }){
  const date = new Date(currentDate)

    function prevDay(){
        const nextDate = subDays(date, 1)
        onChange(formatISO(nextDate))
    }

    function nextDay(){
        const nextDate = addDays(date, 1)
        onChange(formatISO(nextDate))
    }

  return(
    <div className="p-4 flex space-x-4 items-center justify-center">
      <ArrowLeft
         className="w-6 text-red-500" 
         onClick={prevDay}/>
      <span className="font-bold">{format(date, "d 'de' MMMM", {locale: ptBR})}</span>
      <ArrowRight 
         className="w-6 text-red-500"
         onClick={nextDay}/>
    </div>
  )
}

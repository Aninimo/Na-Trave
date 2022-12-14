import axios from 'axios'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useLocalStorage } from 'react-use'

const validationSchema = yup.object().shape({
    homeTeamScore: yup.string().required(),
    awayTeamScore: yup.string().required()
})

export function Card({ disabled, gameId }){
  const [auth] = useLocalStorage('auth')

  return(
    <form className="rounded-xl border border-gray-300 p-4 text-center space-y-4">
      <span className="text-sm md:text-base text-gray-700 font-bold">{gameTime}</span>
      <div className="flex space-x-4 justify-center items-center">
        <span className="uppercase">{homeTeam}</span>
          <img src={`/imgs/flags/${homeTeam}.png`}/>
          <input 
            className="bg-red-300/[0.2] w-[55px] h-[55px] text-red-700 text-xl text-center"
            type="number"
            name="homeTeamScore" 
            value={formik.values.homeTeamScore}
            onChange={formik.handleChange}
            onBlur={formik.handleSubmit}
            disabled={disabled}
          />
          <span className="text-red-500 fonte-bold">X</span>
          <input 
            className="bg-red-300/[0.2] w-[55px] h-[55px] text-red-700 text-xl text-center"
            type="number" 
            name="awayTeamScore" 
            value={formik.values.awayTeamScore}
            onChange={formik.handleChange}
            onBlur={formik.handleSubmit}
            disabled={disabled}
          />
          <img src={`/imgs/flags/${awayTeam}.png`}/>
          <span className="uppercase">{awayTeam}</span>
      </div>
    </form>
  )
}

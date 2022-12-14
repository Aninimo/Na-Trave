import { useState, useEffect} from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useLocalStorage, useAsyncFn } from 'react-use'
import axios from 'axios'
import { format, formatISO } from 'date-fns'

import { ArrowLeft } from 'phosphor-react'

import { Card } from '../components/Card'
import { DateSelect } from '../components/DateSelect'

export function Profile(){
  const params = useParams()
  const navigate = useNavigate()

  const [currentDate, setDate] = useState(formatISO(new Date(2022, 10, 20)))
  const [auth, setAuth] = useLocalStorage('auth', {})
  const [{value: user, loading, error }, fetchHunches] = useAsyncFn(async () => {
  const res = await axios({
    method: 'get',
    baseURL: import.meta.env.VITE_API_URL,
    url: `/${params.username}`,
  })

   const hunches = res.data.hunches.reduce((acc, hunch) => {
     acc[hunch.gameId] = hunch
     return acc
    }, {})

    return {
      ...res.data,
      hunches
    }            
   })

   return(
     <>
       <header className="bg-red-500 text-white">
         <div className="container max-w-3xl flex justify-between p-4">
           <img src="" className="w-28 md:w-40"/>
             {auth?.user?.id && (
               <div onClick={logout} className="p-2 cursor-pointer">
                   Sair
                </div>
              )}
           </div>
         </header>
         <main className="space-y-6">
           <section id="header" className="bg-red-500 text-white">
             <div className="container max-w-3xl space-y-2 p-4">
               <Link href="/dashboard">
                 <ArroLeft size={10}/>
               </Link>
               <h3 className="text-2xl font-bold">{user.value.name}</h3>
              </div>
           </section>
           <section id="content" className="container max-w-3xl p-4 space-y-4">
             <h2 className="text-red-500 text-xl font-bold">
                 Seus palpites
              </h2>
              <DateSelect currentDate={currentDate} onChange={setDate} />
                <div className="space-y-4">
                  {isLoading && 'Carregando jogos.....'}
                  {hasError && 'Ops! Algo deu errado.'}
                  isDone && games.value?.map(game => (
                    <Card
                      key={game.id}
                      gameId={game.id}
                      homeTeam={game.homeTeam}
                      awayTeam={game.awayTeam}
                      gameTime={format(new Date(game.gameTime), 'H:mm')}
                      homeTeamScore={hunches?.value[game.id]?.homeTeamScore || ''}
                      awayTeamScore={hunches?.value[game.id]?.awayTeamScore || ''}
                      disabled={true}
                    />
                 ))}
               </div>        
             </section>
          </main>
       </>
   )
}

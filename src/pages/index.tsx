import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'

type Poke = {
  id: number
  name: string
  image: string
}

export const getServerSideProps = (async (context) => {
  const res = await fetch('https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json')
  const pokemon = await res.json()
  return { props: { pokemon } }
}) satisfies GetServerSideProps<{ pokemon: Poke }>

export default function Home({pokemon}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/pokemon/138`)
  }

  return (
    <div>
      <Head>
        <title>Pokemanos</title>
      </Head>
      <h1 className={styles.h1}>
        Trainee
      </h1>
      <button onClick={handleClick}>
        Usando useRouter para navegar para o Pokemon 138
      </button>
      <main className={styles.main}>
        {pokemon.map((pokemon:Poke) => (
          <Link href={`/pokemon/${pokemon.id}`}>
            <h3>{pokemon.name} (no.{pokemon.id})</h3>
            <img
              src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
              className={styles.img}
            />
          </Link>
        ))}
      </main>
    </div>
  )
}

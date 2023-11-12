import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import Head from "next/head"
import styles from '@/styles/Details.module.css'
import Link from "next/link"

type Info = {
    name: string
    type: []
    stats:[{name: string, value: number}]
    image: string
}

export const getServerSideProps: GetServerSideProps<{
    pokemon: Info
}> = (async (context) => {
    const {id} = context.query
    const res = await fetch(`https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${id}.json`)
    const pokemon = await res.json()
    return { props: { pokemon } }
})

export default function Details({pokemon}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <div>
            <Head><title>{pokemon.name}</title></Head>

            <h1 className={styles.h1}>
                {pokemon.name}
            </h1>
            <div className={styles.div1}>
                <img
                  alt={`${pokemon.name}`}
                  className={styles.img}
                  src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
                />
                <div className={styles.div2}>
                    <div>
                    <h2 className={styles.h2}>{pokemon.name}</h2>
                    {pokemon.type.join(", ")}
                    </div>
                    <table>
                        <tbody>
                        {pokemon.stats.map(({ name, value }) => (
                            <tr key={name}>
                            <td>{name}</td>
                            <td>{value}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Link href="/">
                Voltar
            </Link>
        </div>
    )
}

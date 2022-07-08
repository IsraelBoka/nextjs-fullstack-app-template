import type { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import { RootObject } from '../type'

const Home: NextPage<{datajson: RootObject[]}> = ({datajson}) => {
  return (
    <>
      {datajson.map(itm =>(
        <div key={itm.id}>
          <div>{itm.product_link}</div>
        </div>
      ))}
    </>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await fetch('https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline') // your fetch function here 
  const datajson:RootObject = await data.json()
  return {
    props: {
      datajson
    }
  }
}
export default Home

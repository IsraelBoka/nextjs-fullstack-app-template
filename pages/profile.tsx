import React from 'react'
import { GetServerSideProps } from 'next'
import { PrismaClient, Session, User } from '@prisma/client'

const prisma = new PrismaClient
function profile({skyjson}:any) {
  return (
    <div>
        Have mercy on me !!
        <br/>
        test
    </div>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a  page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const sky = await prisma.user.findMany({
        select:{
            id: true,
            email: true
        }
    })// your fetch function here
    const skyjson = JSON.stringify(sky)

    return {
        props: {
            skyjson
        }
    }
}
export default profile
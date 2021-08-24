import React, { useEffect } from 'react'
import { useCurrentUser } from "@/hooks/index";
import { Link } from "next/link";
import { router } from "next/router";
import AllUser from '../../components/usersCompnent/AllUser';
import Edit from '../../components/usersCompnent/Edit';
import { Navbar } from "../../components/layout/Navbar";
import useForm from "../../hooks/useForm";




const Users = ({ users, totalRecord }) => {
  //buisness logic
  const { handleChange, form, setForm } = useForm("");
  useEffect(() => {
    console.log('usererere', users)
  }, [])

  return (
    <div>

      <AllUser users={users} totalRecord={totalRecord} handleChange={handleChange} form={form} />
      {/* <Edit /> */}
    </div>
  )
}



export default Users;
export async function getStaticProps() {
  const url = `${process.env.Baseurl}/api/admin/artist?limit=10&skip=1`;
  const res = await fetch(url);
  const { artists, totalRecord } = await res.json();
  return {
    props: { users: artists, totalRecord },
  }

  // if(res){
  //     const users = await res.json();
  //    ;
  // }

}
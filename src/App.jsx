import { useState } from 'react'
import './App.css'
import BioData from './components/BioData';
const BioDataLists = [
    {
        name:"Tamim"  ,
        email:"tamim@gmail.com"  ,
        phone:"012548425787",
        skills: ["bat", "ball", "something"],
        socials: [
            {platformName:"facebook", handle:"fb/tamim"},
            {platformName:"linkedin", handle:"linkedin/tamim"},
            {platformName:"x", handle:"x/tamim"},
            {platformName:"something", handle:"something"},
            ]
        },
    {
        name:"afif"  ,
        email:"afif@gmail.com"  ,
        phone:"96385471",
        skills: ["Css", "JS", "TTTL"],
        socials: [
            {platformName:"facebook", handle:"fb/afif"},
            {platformName:"linkedin", handle:"linkedin/afif"},
            {platformName:"x", handle:"x/afif"},
            {platformName:"something", handle:"afif"},
            ]
        },
    {
        name:"santo"  ,
        email:"santo@gmail.com"  ,
        phone:"987548841",
        skills: ["bat", "feilding"],
        socials: [
            {platformName:"facebook", handle:"fb/tamim"},
            {platformName:"linkedin", handle:"linkedin/tamim"},
            {platformName:"x", handle:"x/tamim"},
            {platformName:"something", handle:"something"},
            ]
        },
    {
        name:"Liton"  ,
        email:"Liton@gmail.com"  ,
        phone:"987548745",
        skills: ["bat", "WK"],
        socials: [
            {platformName:"facebook", handle:"fb/Liton"},
            {platformName:"linkedin", handle:"linkedin/Liton"},
            {platformName:"x", handle:"x/Liton"},
            ]
        },
]
function App() {
    return (
        <>
        <h1 style={{paddingBottom:"24px"}}>All Bio Data</h1>
            <div style={{display:"flex"}}>
            {BioDataLists.map((singleData)=>(
                        <BioData 
                        name={singleData.name}
                        email={singleData.email}
                        phone={singleData.phone}
                        skills={singleData.skills}
                        socials = {singleData.socials}
                        />
                    )
                )} 
            </div>

        </>
    )
}

export default App

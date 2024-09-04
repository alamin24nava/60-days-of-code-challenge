function BioData(props){
    /** 
        props = {
        name:"something"  ,
        email:"something"  ,
        phone:"something",
        skills: ["something", "something", "something"],
        socials: [
            {platformName:"something", handle:"something"},
            {platformName:"something", handle:"something"},
            {platformName:"something", handle:"something"},
            {platformName:"something", handle:"something"},
            ]
        }
    */ 
    return(
        <>
            <div style={{border:"1px solid #000", padding:"24px"}}>
                <h2>Bio Data for {props.name}</h2>
            <h3>
                <strong>Name:</strong> {props.name}
            </h3>
            <p>
                <strong>Email:</strong> {props.email}
            </p>
            <p>
                <strong>Phone:</strong> {props.phone}
            </p>
            <div>
                <h3>Skills:</h3>
                <ul>
                    {
                        props?.skills?.map((skill)=> <li key={skill.index}>{skill}</li>)
                    }
                </ul>
            </div>
            <div>
                <h3>Socials:</h3>
                <ul>
                    {
                        props.socials.map((social) =>
                            <li>
                                <strong>{social.platformName} :</strong>
                                {social.handle}
                            </li>
                        )
                    }
                </ul>
            </div>
        </div>
    </>
    )
}

export default BioData
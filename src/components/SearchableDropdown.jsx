import { useEffect, useRef, useState } from "react";
import useOutsideClick from "../hooks/useOutsideClick";
import {getTagsByName, useTagsSelector, postTags, getTags} from "../features/tags/tagsSlice"
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";


const SearchableDropdown = (
    // {selectedDropDown, setSelectedDropDowns}
) => {
    const [selectedDropDown, setSelectedDropDowns] = useState([])
    const [open, setOpen] = useState(false)
    const [changeTagName, setChangeTagName] = useState('')
    const {tagsByName} = useSelector(useTagsSelector)
    const {tags} = useSelector(useTagsSelector)
    const ref = useRef()
    const dispatch = useDispatch()
    const handleSeleteTag = ()=>{
        setOpen(!open)
    }
    useOutsideClick(ref, () => {
        setOpen(false)
    })
    // const handleKeyUp = (e) => {
    //     if (e.key !== "Enter") return 'asdjas'
    //     // handleInput()
    // }
    const handleFilterTag =(e)=>{
        setChangeTagName(e.target.value)
    }
    const handleSelectedDropDown = (item)=>{
        
        const alreadySelectedTag = selectedDropDown.find((r)=>( r?.id === item?.id))
        if(alreadySelectedTag){
          toast.error("Already Selected This Tag!")
          setChangeTagName('')
          return
        }
        console.log(item);
        setSelectedDropDowns([...selectedDropDown, item])
        setChangeTagName('')
        toast.success(`Successfully ${changeTagName} Tag Selected!`)
    }
    const removeSelectedDropDown = (id)=>{
        const updatedDropDown = selectedDropDown.filter((item)=> item.id !== id)
        setSelectedDropDowns(updatedDropDown)
    }
    useEffect(()=>{
        dispatch(getTagsByName(changeTagName))
    },[dispatch, changeTagName])

    const notFindTag = ()=>{
        const noTag = tagsByName.find((r)=>( r.name === changeTagName))
        if(noTag){
            handleSelectedDropDown(noTag)
        }else{
            const newTag = {
                id : Date.now(),
                name:changeTagName.toLowerCase()
            }
            dispatch(postTags(newTag))
            handleSelectedDropDown(newTag)
            setChangeTagName('')
        }
        // console.log(tagsByName,noTag);
        // const alr = tags.find((rr)=>( rr.name == changeTagName));
        // if(!noTag){
        
        // }else{
        //     handleSelectedDropDown(noTag)
        // }
        // if(!noTag){
        //     // setSelectedDropDowns([...selectedDropDown])
        // }
    }
    const handleKeyUp = (e) => {
        if (e.key !== "Enter") return 
        notFindTag()
    }

    return (
        <>      
            <div ref={ref}>
                <div onClick={handleSeleteTag} className="border p-4 rounded-md mb-4">-- Select Tags --</div> 
                    {
                        selectedDropDown.length > 0?
                        <div className="border flex gap-4 wrap p-4 py-2 rounded-md">
                            {
                                selectedDropDown.map((item)=>
                                    <div key={item.id} role="alert" className="alert w-auto py-1 px-2">
                                        <span>{item.name}</span>
                                        <svg onClick={()=>removeSelectedDropDown(item.id)}
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 shrink-0 stroke-current"
                                            fill="none"
                                            viewBox="0 0 24 24">
                                            <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                )
                            }
                        </div>
                        :null
                        
                    }

                    <div className={open ? 'border p-4 mt-2 rounded-md block' : 'border mt-2 rounded-md h-0 hidden'}>
                        <div className="w-full mb-4">
                            <input type="text"  onKeyUp={handleKeyUp} value={changeTagName} onChange={handleFilterTag} placeholder="Search Or Create Tags..." className="input input-bordered w-full" />
                        </div>
                        <div className="overflow-auto h-[8rem]">
                            {
                                tagsByName.map((item)=>
                                    <div value={item.name}  onClick={()=>handleSelectedDropDown(item)} key={item.id} className="cursor-pointer">{item.name}</div>                            
                                )
                            }
                        </div>
                    </div>
            </div> 
        </>
    );
};

export default SearchableDropdown;
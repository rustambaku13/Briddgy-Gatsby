import { Button } from '@chakra-ui/button'
import { Input } from '@chakra-ui/input'
import React, { useEffect, useRef, useState } from 'react'
import { bmify } from '../../api'
import { avatarPicUpload } from '../../api/user'
import UserStore from '../../store/UserStore'
import { compressAndReturn } from '../../utils/compression'

export const ImageChangeButton = ()=>{
    const fileRef = useRef(null)
    const [isLoading,setLoading] = useState(false)
    
    const handleUpload = ()=>{
        
    }
    function uploadFile(e){
        const file = e.target.files[0]
        setLoading(true)
        compressAndReturn([file])
        .then((files)=>{            
            return avatarPicUpload(files)
        })
        .then(({data})=>{
            UserStore.changeAvatarPic(data.name)
        })
        .finally(()=>{
            setLoading(false)
        })

    }
    return(
        <>
        {<Button isLoading={isLoading} w="100%" variant="link" onClick={
            ()=>{
                fileRef.current.click()
            }
        } color="tealBlue.base" mt={3}>
            Change
          </Button>}
          <Input onChange={uploadFile} type='file' ref={fileRef} d='none'/>
          </>

    )
   
}
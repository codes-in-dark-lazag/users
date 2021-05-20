import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import {Dialog, DialogContent, DialogContentText,Box
        , Table, TableBody, DialogTitle,Divider, IconButton
          } from '@material-ui/core';
import { CloseRounded } from "@material-ui/icons";


const useStyles = makeStyles({
        rowStyle:{
          marginTop:"20px",
        },
});
const UsersPage = ({users, doRefresh}) =>{
    
    const [open, setOpen] = useState(false)
    const [curr, setCurrent] = useState({link:"", title:""})
    const classes = useStyles();
    const displayModal = (link, title)=>{
      setOpen(true);
      setCurrent({link:link, title:title})
    }

    useEffect(()=>{
        window.onscroll = function () {
            doRefresh();
        }
    }, [users])
        
    return (
      <>
        <div className="container">
            <Table>
                <TableBody>
                {users.map((user) => {
                    const {link, title,
                        creation_date}=user;
                    const authour_name = user.owner.display_name;
                    return (
                          <button onClick={()=>displayModal(link, title)}  className="stylingRow">
                            <tr className={classes.rowStyle} >
                              <td width="250" align="left">{authour_name}</td>
                              <td width="450" align="center">{title}</td>
                              <td width="350" align="right">{Date(creation_date)}</td>
                            </tr>
                          </button>
                    );
                  })}
                </TableBody>
            </Table>
        </div>
        <Dialog open={open}>
        <DialogTitle>
          <div style={{display:"flex"}}>
            <Box width="100%">
             <p className="dialog-title">{curr.title}</p> 
            </Box>
            <IconButton className="dialog-close-icon-container" size="small"  onClick={()=>setOpen(false)}>
                    <CloseRounded className="dialog-close-icon"/>
            </IconButton>
          </div> 
          
        </DialogTitle>
        <DialogContent>
            <DialogContentText>
              <a className="dialog-content" href={curr.link}>{curr.link}</a>
            </DialogContentText>
          </DialogContent>
        </Dialog>
        
      </>
    )
}
export default UsersPage


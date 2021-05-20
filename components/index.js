import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import {Dialog, DialogContent, DialogContentText,Box
        , Table, TableBody, DialogTitle,Divider, IconButton
          } from '@material-ui/core';
import { CloseRounded } from "@material-ui/icons";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from 'react-loader-spinner';


const useStyles = makeStyles({
        rowStyle:{
          marginTop:"20px",
        },
});
const UsersPage = ({users, doRefresh}) =>{
    const [open, setOpen] = useState(false)
    const [curr, setCurrent] = useState({link:"", title:""})
    const classes = useStyles();
    const [list, setList] = useState(users);
    const displayModal = (link, title)=>{
      setOpen(true);
      setCurrent({link:link, title:title})
    }
    const getMoreUsers = async() =>{
      const result = await fetch(`https://api.stackexchange.com/2.2/search/advanced?page=${list.length}&pagesize=10&order=desc&sort=activity&site=stackoverflow`)
      const jsonResult = await result.json();
      setList(listofUsers => [...listofUsers, ...jsonResult.items]);
    }
    const DetailsDisplay = () =>{
      return (
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
      )
    }
    return (
      <>
        <div className="container">
            <Table>
                <TableBody>
                <InfiniteScroll
                  dataLength={list.length}
                  next={getMoreUsers}
                  hasMore={true}
                  loader={ <div className="loader-position-web"> 
                            <Loader
                                type="Oval"
                                color="#000066"
                                height={50}
                                width={50}
                                visible={true}
                            />
                        </div>}
                >
                  {list.map((user) => {
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
                </InfiniteScroll>
                
                </TableBody>
            </Table>
        </div>
        {DetailsDisplay()}
      
        
      </>
    )
}
export default UsersPage


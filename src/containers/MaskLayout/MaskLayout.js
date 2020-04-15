import React,{ Component } from 'react';
import Aux from '../../hoc/Auxilliary/Auxilliary';
import Masks from '../../components/Masks/Masks';
import axios from '../../axios';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';

import classes from './MaskLayout.css';

class MaskLayout extends Component {
    state = {
        maskInfos: null,
        loading: false,
        town: null
    }

    bubbleSort = (inputArr) => {
        let len = inputArr.length;
        let swapped;
        do {
            swapped = false;
            for (let i = 0; i < len; i++) {            
                if(inputArr[i + 1]){
                    const currentCount = inputArr[i]['properties']['mask_child'];
                    const nextCount = inputArr[i + 1]['properties']['mask_child'];
                    // console.log(i,currentCount,nextCount);
                    if (currentCount > nextCount) {
                        // console.log('swap',i,i+1)
                        let tmp = inputArr[i];
                        inputArr[i] = inputArr[i + 1];
                        inputArr[i + 1] = tmp;
                        swapped = true;
                    }
                }
            }
        } while (swapped);
        // const test = inputArr.map((el)=>el['properties']['mask_child']).reverse();
        // console.log(test);
        return inputArr;
    };

    findMasks = (data,town) =>{
        let maskHaveChilds = [];
        const locationFilters={
            country: '桃園市',
            town: town
        }
        if(data['features']){
            data['features'].forEach(el => {
                if(el['properties']){
                    if(el['properties']['county'] === locationFilters.country && el['properties']['town'] === locationFilters.town && !el['properties']['note'].includes('暫停')){                                                
                        if(el['properties']['mask_child'] > 0){                            
                            maskHaveChilds.push(el);
                        }                        
                    }
                }
            });
        }
        this.bubbleSort(maskHaveChilds);
        return maskHaveChilds.reverse();
    }

    loadData = (town) => {
        this.setState({loading: true});
        axios.get('')
            .then(res=>{                
                const findDatas = this.findMasks(res.data,town);
                // console.log(findDatas);
                this.setState({
                    maskInfos: findDatas,
                    loading : false,
                    town: town
                });
            })
            .catch(err=>{
                console.log(err);
                this.setState({
                    maskInfos: null,
                    loading : false,
                    town: null
                });
            })
    }

    componentDidMount(){              
        this.loadData('八德區');
    }    

    searchTownMaskHandler = (town) => {
        this.loadData(town);
    }

    render(){
        let maskInfo = null;
        if(this.state.maskInfos){
            maskInfo = (
                <div style={{margin:'60px 0', textAlign:'center'}}>
                    <h3>桃園市-{this.state.town} : {this.state.maskInfos.length}間</h3>
                    { this.state.maskInfos ? <Masks data={this.state.maskInfos}/> : null}
                </div>
            )
        }
        return (
            <Aux>                
                <Modal show={this.state.loading}>
                    <Spinner />
                </Modal>                
                <header className={classes.Toolbar}>
                    <Button clicked={()=>this.searchTownMaskHandler('桃園區')}>桃園區</Button>
                    <Button clicked={()=>this.searchTownMaskHandler('八德區')}>八德區</Button>
                </header>
                {maskInfo}
            </Aux>
        );
    }
}

export default MaskLayout;
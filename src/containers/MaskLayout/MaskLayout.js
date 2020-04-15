import React,{ Component } from 'react';
import Aux from '../../hoc/Auxilliary/Auxilliary';
import Masks from '../../components/Masks/Masks';
import axios from '../../axios';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import { find } from 'async';


class MaskLayout extends Component {
    state = {
        maskInfos: null,
        loading: false
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

    findMasks = (data) =>{
        let maskHaveChilds = [];
        const locationFilters={
            country: '桃園市',
            town: '八德區'
        }
        if(data['features']){
            data['features'].forEach(el => {
                if(el['properties']){
                    if(el['properties']['county'] === locationFilters.country && el['properties']['town'] === locationFilters.town){                                                
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

    componentDidMount(){      
        // console.log('[MaskLayout] componentDidMount',axios);
        this.setState({loading : true});
        axios.get('')
            .then(res=>{                
                const findDatas = this.findMasks(res.data);
                // console.log(findDatas);
                this.setState({
                    maskInfos: findDatas,
                    loading : false
                });
            })
            .catch(err=>{
                console.log(err);
                this.setState({
                    maskInfos: null,
                    loading : false
                });
            })
    }    

    render(){
        return (
            <Aux>
                <Modal show={this.state.loading}>
                    <Spinner />
                </Modal>                
                { this.state.maskInfos ? <Masks data={this.state.maskInfos}/> : null}
            </Aux>
        );
    }
}

export default MaskLayout;
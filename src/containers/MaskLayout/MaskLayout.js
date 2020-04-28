import React,{ Component } from 'react';
import Aux from '../../hoc/Auxilliary/Auxilliary';
import Masks from '../../components/Masks/Masks';
import axios from '../../axios';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';

import classes from './MaskLayout.css';

class MaskLayout extends Component {
    state = {        
        maskInfoChilds: null,
        maskInfoAdults: null,
        loading: false,
        town: null,
        filterType: 'child',
        selectMaskType: {
            elementType: 'select',
            elementConfig: {
                options: [
                    {value: 'child', displayValue: '兒童'},
                    {value: 'adult', displayValue: '大人'}
                ]                       
            },
            value: 'child',
            validation: {},
            valid: true        
        }
    }

    // constructor(props){
    //     super(props);
    //     if(navigator.geolocation) {

    //         // 使用者不提供權限，或是發生其它錯誤
    //         function error() {
    //           alert('無法取得你的位置');
    //         }
          
    //         // 使用者允許抓目前位置，回傳經緯度
    //         function success(position) {
    //           console.log(position.coords.latitude, position.coords.longitude);
    //         }
          
    //         // 跟使用者拿所在位置的權限
    //         navigator.geolocation.getCurrentPosition(success, error);
          
    //       } else {
    //         alert('Sorry, 你的裝置不支援地理位置功能。')
    //       }
    // }

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
        let maskHaveAdults = [];
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
                        if(el['properties']['mask_adult'] > 0){                            
                            maskHaveAdults.push(el);
                        }                       
                    }
                }
            });
        }
        this.bubbleSort(maskHaveChilds);
        this.bubbleSort(maskHaveAdults);
        return [maskHaveChilds.reverse(), maskHaveAdults.reverse()];
    }

    loadData = (town) => {
        this.setState({loading: true});
        axios.get('')
            .then(res=>{                
                const findDatas = this.findMasks(res.data,town);
                // console.log(findDatas);
                this.setState({
                    maskInfoChilds: findDatas[0],
                    maskInfoAdults: findDatas[1],
                    loading : false,
                    town: town
                });
            })
            .catch(err=>{
                console.log(err);
                this.setState({
                    maskInfoChilds: null,
                    maskInfoAdults: null,
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

    selectTypeChangedHandler = (event) => {
        console.log(event.target.value);
        const updatedSelect = {...this.state.selectMaskType};
        updatedSelect.value = event.target.value;
        this.setState({
            selectMaskType: updatedSelect,
            filterType: event.target.value
        })
    }

    selectMaskComponent = () => {        
        return (
            <Input 
                    key='selectType'
                    elementType={this.state.selectMaskType.elementType}
                    elementConfig={this.state.selectMaskType.elementConfig}
                    value={this.state.selectMaskType.value} 
                    invalid={!this.state.selectMaskType.valid}
                    shouldValidate={this.state.selectMaskType.validation}
                    touched={this.state.selectMaskType.touched}
                    changed={this.selectTypeChangedHandler}/>
        )
    }

    render(){
        const selectElement = this.selectMaskComponent();
        // console.log(selectElement);
        let maskInfo = null;
        // console.log(this.state);
        if(this.state.maskInfoChilds && this.state.maskInfoAdults){
            let masks = null;
            switch(this.state.filterType){
                case ('child'):
                    masks = this.state.maskInfoChilds;
                    break;
                case ('adult'):
                    masks = this.state.maskInfoAdults;
                    break;
                default:
                    masks = null;
            }
            maskInfo = (
                <div style={{margin:'60px 0', textAlign:'center'}}>
                    <h3>桃園市-{this.state.town} : {masks.length}間</h3>
                    { masks ? <Masks data={masks}/> : null}
                </div>
            )
        }
        return (
            <Aux>                
                <Modal show={this.state.loading}>
                    <Spinner />
                </Modal>                
                <header className={classes.Toolbar}> 
                    {selectElement}                   
                    <Button clicked={()=>this.searchTownMaskHandler('八德區')}>八德區</Button>
                    <Button clicked={()=>this.searchTownMaskHandler('桃園區')}>桃園區</Button>                    
                    <Button clicked={()=>this.searchTownMaskHandler('蘆竹區')}>蘆竹區</Button>
                </header>
                {maskInfo}
            </Aux>
        );
    }
}

export default MaskLayout;
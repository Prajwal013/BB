import React from "react"
import image1 from "../Assets/community1.svg"
// import image2 from "../Assets/community2.svg"
// import image3 from "../Assets/community3.svg"
import {useSelector, useDispatch} from "react-redux"
import {incCounter} from "../Redux/increment/incrementAction"
import LoadingOverlay from "react-loading-overlay"
import { Switch } from 'antd';


import {Modal} from "antd"
import {Select} from "antd"

import "./page1.css"
import {useState} from "react"
import {useEffect} from "react"

const CardSection = () => {
    const theme = useSelector((state) => state.theme)
    const dispatch = useDispatch()

    const [group, setGroup] = useState([])
    const [person, setPerson] = useState([])
    const [modaldata, setModaldata] = useState({})

    
    useEffect(() => {
        
        fetch(process.env.NODE_ENV==="production"?"https://demo.bigbeartech.in//sample-api":"/server/sample-api")
            .then((response) => response.json())
            .then((data) => {
                console.log(data, Object.keys(data))
                setPerson(data)
                setGroup(Object.keys(data))
            })
    }, [])

    const [isModalVisible, setIsModalVisible] = useState(false)

    const showModal = () => {
        setIsModalVisible(true)
    }
    const onToggle = () =>{
        dispatch(incCounter())
    }

    const handleOk = () => {
        setIsModalVisible(false)
    }

    const handleCancel = () => {
        setIsModalVisible(false)
    }

    const {Option} = Select

    function onChange(p, g) {
        console.log(`selected ${p} ${g}`, person[g][p])
        showModal()
        setModaldata(person[g][p])
    }

    function onBlur() {
        console.log("blur")
    }

    function onFocus() {
        console.log("focus")
    }

    function onSearch(val) {
        console.log("search:", val)
    }

    return (
        <LoadingOverlay active={group.length==0} spinner text="Loading your content...">

        <section className="toggle" theme-mode={theme}>

            <h1 theme-mode={theme} className="heading">Big-Bear Communities</h1>
            <Switch className="switch" checkedChildren="Light" unCheckedChildren="Dark" defaultChecked onChange={onToggle} />
            {/* <button onClick={() => dispatch(incCounter())}>Toggle theme {theme}</button> */}
            

            <div className="cardwrapper">
                {group.map((g) => {
                    return (
                        <div key={g} className="card-container">
                            <div className="flip-card">
                                <div className="flip-card-inner">
                                    <div className="flip-card-front">
                                        <img
                                            src={image1}
                                            alt="Avatar"
                                            className="community-logo"
                                        />
                                        <h2>
                                            {"Community "}
                                            {g}
                                        </h2>
                                    </div>
                                    <div className="flip-card-back">
                                        <p>Check the Information of each candidate</p>
                                        <Select
                                            className="community-select"
                                            showSearch
                                            style={{width: 200}}
                                            placeholder="Select a person"
                                            optionFilterProp="children"
                                            onChange={(p) => onChange(p, g)}
                                            onFocus={onFocus}
                                            onBlur={onBlur}
                                            onSearch={onSearch}
                                            filterOption={(input, option) =>
                                                option.children
                                                    .toLowerCase()
                                                    .indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            {person[g] ? (
                                                person[g].map((p, i) => {
                                                    return (
                                                        <Option key={p.name} value={i}>
                                                            {p.name}
                                                        </Option>
                                                    )
                                                })
                                            ) : (
                                                <Option value="No data">No data</Option>
                                            )}
                                        </Select>
                                        <Modal
                                            title={modaldata.name + "'s Profile"}
                                            visible={isModalVisible}
                                            onOk={handleOk}
                                            onCancel={handleCancel}
                                        >
                                            <ul className="personal-info">
                                                <li>
                                                    {" "}
                                                    <b>Name : </b>
                                                    {modaldata.name}
                                                </li>
                                                <li>
                                                    <b>Gender : </b>
                                                    {modaldata.gender}
                                                </li>
                                                <li>
                                                    <b>Age : </b>
                                                    {modaldata.age}
                                                </li>
                                            </ul>
                                            <ul className="personal-pics">
                                                <img src={image1}></img>
                                                <img src={image1}></img>
                                                <img src={image1}></img>
                                            </ul>
                                        </Modal>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
        </LoadingOverlay>

    )
}

export default CardSection

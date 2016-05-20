import React, {Component} from 'react'
import style from './style.css'

export default class Loader extends Component {

    render() {
        return (
            <div className={style.container}>
                <div>
                    <div className={style.pacman}>
                        <div></div>
                        <div></div>
                        <div>C</div>
                        <div>O</div>
                        <div>O</div>
                        <div>L</div>
                    </div>
                </div>


                <div className={style.right}>
                    <div className={style.pacman_b}>
                        <div>H</div>
                        <div>U</div>
                        <div>N</div>
                        <div>T</div>
                    </div>
                </div>
                <div className={style.hint}>
                    加载中...
                </div>
            </div>
        )
    }
}
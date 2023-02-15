// UI and styles
import '../App.css';
import state1 from '../img/state1.GIF'
import state2 from '../img/state2.GIF'
import state3 from '../img/state3.GIF'
import state4 from '../img/state4.GIF'
import state5 from '../img/state5.GIF'
import state6 from '../img/state6.GIF'
import state7 from '../img/state7.GIF'
import state8 from '../img/state8.GIF'
import state9 from '../img/state9.GIF'
import state10 from '../img/state10.gif'
import state11 from '../img/state11.GIF'

export function HangmanImage(props) {
    return (
        <div>
            <img src={props.stateImg}></img>
        </div>
    ) 
}
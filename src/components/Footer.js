// UI and styles
import {Row, Col} from 'react-bootstrap'
import '../App.css';

export function Footer(){
return (
    <footer>
        <Row className='hangman_footer'>
            <Col sm={12}>
            <span>Coded by Sam Glover</span>
            </Col>
        </Row>
    </footer>
)

}

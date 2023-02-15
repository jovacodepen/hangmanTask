// UI and styles
import {Row, Col} from 'react-bootstrap'
import '../App.css';

export function Header(){
return (
    <header>
        <Row className='hangman_header'>
            <Col sm={12}>
            <h1 className='hangman_header_heading'>Hangtime</h1>
            </Col>
        </Row>
    </header>
)

}

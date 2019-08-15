import React, { Component } from "react"
import { Link } from "react-router-dom"

import { Menu } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'


import "bootstrap/dist/css/bootstrap.min.css"


class NavBar extends Component {
    state = { activeItem: 'Cards' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    render() {
        const { activeItem } = this.state
        return (
            <Menu tabular>
                <Menu.Item as={Link} to="/cards" name='Cards' active={activeItem === 'Cards'} onClick={this.handleItemClick} />
                <Menu.Item as={Link} to="/practice" name='Practice' active={activeItem === 'Practice'} onClick={this.handleItemClick} />
                {/* <button onClick={() => sessionStorage.clear()} to="/" className="ui primary button">Logout</button> */}
                <Button className="ui primary right menu" as={Link} to="/" content='Logout' onClick={() => sessionStorage.clear()} />
                {/* <Link className="btn btn-primary btn-sm" onClick={() => sessionStorage.clear()} to="/">Logout</Link> */}
            </Menu>
        )
    }
}

export default NavBar
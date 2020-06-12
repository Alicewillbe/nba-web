import React, {Component} from 'react';
import { AutoComplete, Input, Icon } from 'antd';
import nba from '../external/nba-client';
import { PROFILE_PIC_URL_PREFIX } from '../Constants';

class SearchBar extends Component {
    state = {
        dataSource: [],
    };

    handleSearch = (value) => {
        console.log(value);

        this.setState({
            dataSource: !value ?
                [] : nba.searchPlayers(value).map(player => ({
                    fullName: player.fullName,
                    playerId: player.playerId,
                }))
        });
    }

    onSelect = (playerName) => {
        this.props.handleSelectPlayer(playerName);
    }

    render() {
        const { dataSource } = this.state;
        const options = dataSource.map((player) => (
            <AutoComplete.Option key={player.fullName} value={player.fullName}          className="player-option">
                <img className="player-option-image" src={`${PROFILE_PIC_URL_PREFIX}/${player.playerId}.png`}/>
                <span className="player-option-label">{player.fullName}</span>
            </AutoComplete.Option>
        ));

        console.log(this.state.dataSource);
        return (
            <AutoComplete
                className="search-bar"
                size="large"
                dataSource={options}
                onSelect={this.onSelect}
                onSearch={this.handleSearch}
                placeholder="Search NBA Player"
                optionLabelProp="value"
            >
                <Input suffix={<Icon type="search" className="certain-category-icon" />} />
            </AutoComplete>
        );
    }
}

export default SearchBar;
/**
 * Created by hmd on 4/30/17.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    Image,
} from 'react-native';
import Commons from "../commons"
import {connect} from 'react-redux';
import Search from 'react-native-search-box';
import AtoZListView from 'react-native-atoz-listview';
var Contacts = require('react-native-contacts');
import SearchBar from 'react-native-searchbar';
//import { contactFetch } from '../../actions';
const ContactStyles = {
    rowContainer: {
        flexDirection: 'row',
        height: 50,
        backgroundColor: '#f2f2f2',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: 15,
    },
    rowUnderlayColor: 'grey',
    rowTextContainer: {
        paddingLeft: 10
    },
    rowText: {
        fontSize: 18,
        fontWeight: '300'
    },
    rowSubText: {
        fontSize: 14,
        fontWeight: '300'
    },
    rowSeparator: {
        borderBottomWidth: 0.5,
        borderBottomColor: 'rgba(0, 0, 0, 0.3)'
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20
    },
    sectionHeader: {
        height: 40,
        backgroundColor: '#ccc',
        justifyContent: 'center',
        paddingLeft: 15
    },
    sectionHeaderText: {
        fontSize: 18,
        fontWeight: '300'
    },
    headerContainer: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#f7f7f7',
        paddingLeft: 10,
    },
    headerText: {
        fontSize: 18,
        fontWeight: '200',
        color: 'rgba(0, 0, 0, 0.6)'
    },
    footerContainer: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f7f7f7',
        borderBottomWidth: 0.5,
        borderBottomColor: 'rgba(0, 0, 0, 0.3)'
    },
    footerText: {
        fontSize: 30,
        fontWeight: '200',
        color: 'rgba(0, 0, 0, 0.6)'
    }
};

function renderLeft(state, setParams) {
    const {editing} = state.params || false;
    return (
        <TouchableHighlight
            style={{
                paddingLeft: 10
            }}
            onPress={() => {
                state.params.handleEdit();
                setParams({
                    editing: !editing
                });
            }}
        >
            <Text>{editing ? 'Done' : 'Edit'}</Text>
        </TouchableHighlight>

    );
}

class Home extends Component {

    static navigationOptions = {
        title: 'Contacts',
        header: ({state, setParams}) => ({
            left: renderLeft(state, setParams),
        }),
    }

    componentWillMount() {


        // this.props.navigation.setParams({
        //     editing: false,
        //     handleEdit: this.handleEdit.bind(this),
        // });
        this.props.updateContacts();


    }

    _handleResults(results) {
        //this.setState({ results });
    }

    handleEdit() {
        console.log(this);
    }

    renderSectionHeader = (sectionId, rowId) => {
        return (
            <View style={ContactStyles.sectionHeader}>
                <Text style={ContactStyles.sectionHeaderText}>{rowId}</Text>
            </View>
        );
    }

    renderRow = (item, sectionId, index) => {
        return (
            <TouchableHighlight
                underlayColor={ContactStyles.rowUnderlayColor}
                onPress={() => this.refs.search_bar.focus(item.name)}
            >
                <View style={ContactStyles.rowContainer}>
                    <Image
                        source={{ uri: item.thumbnailPath || 'https://randomuser.me/api/portraits/med/men/40.jpg' }}
                        style={ContactStyles.avatar}
                    />
                    <View style={ContactStyles.rowTextContainer}>
                        <Text style={ContactStyles.rowText}>{item.name}</Text>
                        <Text style={ContactStyles.rowSubText}>{item.email}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    renderSeparator = (sectionId, rowId) => {
        return <View style={ContactStyles.rowSeparator} key={`${sectionId}${rowId}`}/>;
    }

    renderHeader = () => {
        return (
            <View style={ContactStyles.headerContainer}>
                <Text style={ContactStyles.headerText}>My Number: +8498-280-8065</Text>
            </View>
        );
    }

    renderFooter = () => {
        return (
            <View style={ContactStyles.footerContainer}>
                <Text style={ContactStyles.footerText}>{this.props.count} Contacts</Text>
            </View>
        );
    }

    beforeFocus = () => {
        /*return new Promise((resolve, reject) => {
            console.log('beforeFocus');
            resolve();
        });*/
    }

    onFocus = (text) => {
        return new Promise((resolve, reject) => {
            console.log('onFocus', text);
            resolve();
        });
    }

    afterFocus = () => {
        /*return new Promise((resolve, reject) => {
            console.log('afterFocus');
            resolve();
        });*/
    }

    onCancel = () => {
        return new Promise((resolve, reject) => {
            console.log('onCancel');
            resolve();
        });
    }

    afterDelete = () => {
        return new Promise((resolve, reject) => {
            console.log('afterDelete => toggle keyboard');
            this.refs.search_bar.focus();
            resolve();
        });
    }

    onSearch = (text) => {
        return new Promise((resolve, reject) => {
            console.log('onSearch', text);
            resolve();
        });
    }

    onChangeText = (text) => {
        return new Promise((resolve, reject) => {
            console.log('onChangeText', text);
            resolve();
        });
    }

    render() {
        return (
            <View
                style={{ flex: 1 , paddingTop: 60}}
            >
                <SearchBar
                    ref={(ref) => this.searchBar = ref}
                    data={this.props.contacts}
                    handleResults={this._handleResults}
                    showOnLoad
                />
                <AtoZListView
                    enableEmptySections
                    data={this.props.contacts}
                    renderRow={this.renderRow}
                    rowHeight={50}
                    renderSectionHeader={this.renderSectionHeader}
                    sectionHeaderHeight={40}
                    renderSeparator={this.renderSeparator}
                    renderHeader={this.renderHeader}
                    headerHeight={50}
                    renderFooter={this.renderFooter}
                    footerHeight={50}
                    style={{
                        top: this.atoZAnimated
                    }}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => ({contacts: state.contacts.data || [], count: state.contacts.count || 0});
const mapDispatchToProps = (dispatch) => ({
    updateContacts() {
        var contactData = Commons.BuildNamedAction("CONTACT_RECORD", "data");
        var contactCount = Commons.BuildNamedAction("CONTACT_RECORD", "count");
        Contacts.getAll((err, contacts) => {
            if (err && err.type === 'permissionDenied') {
                // x.x
            } else {

                var alpha = contacts.map((contact)=> {
                    return {
                        id: contact.recordID,
                        name: contact.givenName + " " + contact.familyName,
                        last: contact.familyName,
                        phone: contact.phoneNumbers && contact.phoneNumbers.length > 0 ? contact.phoneNumbers[0].number : null,
                        thumbnailPath: contact.thumbnailPath//
                    };
                });

                var sections = {};
                for (var i = 0; i < alpha.length; i++) {
                    !sections[alpha[i][0]] ? sections[alpha[i].name[0]] = [alpha[i]] : sections[alpha[i].name[0]].push(alpha[i]);
                }
                console.log(alpha.length);
                console.log(Object.keys(sections).length);
                dispatch(contactData(alpha));

                dispatch(contactCount(alpha.length));
            }
        })
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
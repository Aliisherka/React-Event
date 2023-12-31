import { Button, Modal, Row } from "antd";
import Layout from "antd/es/layout/layout";
import { FC, useEffect, useState } from "react";
import EventCalendar from "../components/Calendar/EventCalendar";
import EventForm from "../components/EventForm/EventForm";
import { useActions } from "../hooks/useActions";
import { useTypedselector } from "../hooks/useTypedSelector";
import { IEvent } from "../models/IEvent";


const Event: FC = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const {fetchGuests, createEvent, fetchEvents} = useActions()
    const {guests, events} = useTypedselector(state => state.event);
    const {user} = useTypedselector(state => state.auth);

    useEffect(() => {
        fetchGuests();
        fetchEvents(user.username);
    },[])

    const addNewEvent = (event: IEvent) => {
        setModalVisible(false);
        createEvent(event)
    }

    return (
        <Layout>
            <EventCalendar events={events}/>
            <Row justify='center'>
                <Button
                    onClick={() => setModalVisible(true)}
                >
                    Add event
                </Button>
            </Row>
            <Modal
                title="Add event"
                open={modalVisible}
                footer={null}
                onCancel={() => setModalVisible(false)}
            >
                <EventForm guests={guests} submit={addNewEvent}/>
            </Modal>
        </Layout>
    )
}

export default Event;
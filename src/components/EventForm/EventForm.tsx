import { Button, DatePicker, DatePickerProps, Form, Input, Row, Select } from "antd";
import { FC, useState } from "react";
import { useTypedselector } from "../../hooks/useTypedSelector";
import { IEvent } from "../../models/IEvent";
import { IUser } from "../../models/IUser";
import { formatDate } from "../../utils/date";
import { rules } from "../../utils/rules";

type FieldType = {
    description?: string;
    date?: string;
    guest?: string;
};

interface EventFormProps {
    guests: IUser[];
    submit: (event: IEvent) => void 
}

const EventForm: FC<EventFormProps> = (props) => {
    const [event, setEvent] = useState<IEvent>({
        author: '',
        date: '',
        description: '',
        guest: ''
    } as IEvent);
    const {user} = useTypedselector(state => state.auth)

    const onChange: DatePickerProps['onChange'] = (date) => {
        if (date) {
            setEvent({...event, date: formatDate(date.toDate())})
        }
    }

    const submitForm = () => {
        props.submit({...event, author: user.username})
    }

    return (
        <Form onFinish={submitForm}>
            <Form.Item<FieldType>
                label="Event description"
                name="description"
                rules={[rules.required()]}
            >
                <Input value={event.description} onChange={(e) => setEvent({...event, description: e.target.value})}/>
            </Form.Item>
            <Form.Item<FieldType>
                label="Event date"
                name="date"
                rules={[rules.required(), rules.isDateAfter(`Can't create an event in the past`)]}
            >
                <DatePicker onChange={onChange}  />
            </Form.Item>
            <Form.Item<FieldType>
                label="Choose guest"
                name="guest"
                rules={[rules.required()]}
            >
                <Select
                    onChange={(guest: string) => setEvent({...event, guest})}
                    options={
                        props.guests.map(guest => { return { value: guest.username, label: guest.username } })
                    }
                />
            </Form.Item>
            <Row justify='end'>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Add
                    </Button>
                </Form.Item>
            </Row>
        </Form>
    )
}

export default EventForm;
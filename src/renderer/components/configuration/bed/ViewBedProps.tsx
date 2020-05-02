import * as React from 'react';
import { Divider, Form } from 'antd';

import { BriefRecordType } from '../../../store/types';
import { BedParams } from '../../../store/bed.store';
import { FixedBed } from '../../../../utils/calculation/bedProps.maths';

export interface ViewBedPropsComponentProps {
    data: BriefRecordType<BedParams>;
}

export const ViewBedProps: React.FunctionComponent<ViewBedPropsComponentProps> = ({ data }) => {
    const { name, description, length, diameter, mass, flowrate, ebct } = data;
    return (
        <Form size="small" layout="horizontal" labelCol={{ span: 8 }} wrapperCol={{ span: 8 }}>
            <Form.Item label="Name">
                <span>{name}</span>
            </Form.Item>
            <Form.Item label="Description">
                <span>{description}</span>
            </Form.Item>
            <Divider orientation="left" />
            <Form.Item label="Bed Length">
                <span>{`${length} cm`}</span>
            </Form.Item>
            <Form.Item label="Bed Diameter">
                <span>{`${diameter} cm`}</span>
            </Form.Item>
            <Form.Item label="Mass">
                <span>{`${mass} g`}</span>
            </Form.Item>
            <Form.Item label="Flowrate">
                <span>{`${flowrate} mL/min`}</span>
            </Form.Item>
            <Form.Item label="EBCT">
                <span>{`${ebct} min`}</span>
            </Form.Item>
            <Divider orientation="left">Calculation</Divider>
            <Form.Item label="Bed Density">
                <span>{`${FixedBed.density(mass, length, diameter)} g/mL`}</span>
            </Form.Item>
            <Form.Item label="Bed Porosity">
                <span>{`${0}`}</span>
            </Form.Item>
            <Form.Item label="Cross-Sectional Area">
                <span>{`${FixedBed.crossSectionalArea(diameter)} cm²`}</span>
            </Form.Item>
            <Form.Item label="Bed Volume">
                <span>{`${FixedBed.volume(length, diameter)} cm³`}</span>
            </Form.Item>
            <Form.Item label="Superficial Velocity">
                <span>{`${ebct} m/h`}</span>
            </Form.Item>
            <Form.Item label="Interstitial Velocity">
                <span>{`${ebct} m/h`}</span>
            </Form.Item>
            <Form.Item label="EBCT">
                <span>{`${ebct} min`}</span>
            </Form.Item>
        </Form>
    );
};

import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { Row, Col, Button, Card, Alert, Form } from "react-bootstrap";
import { Link, useParams } from '@tanstack/react-router'
import { useState } from "react";
import dummy from "../../data/dummy.json";
import {
  getTransactionById,
  getPaymentById,
} from "../../services/order-history/index";

export const OrderDetailCard = ({ transactionId }) => {
  const [payments, setPayments] = useState(dummy.payment);

  const [transactions, setTransactions] = useState(null);

  const { data: transaction } = useQuery({
    queryKey: ["transaction", transactionId],
    queryFn: () => getTransactionById(transactionId),
    enabled: !!transactionId,
    onSuccess: (transaction) => {
      setTransactions(transaction); // Update state directly when the query succeeds
    },
    onError: (err) => {
      toast.error("An error occurred while fetching the transaction data");
    },
  });
  console.log("transaction", transaction);

  return (
    <Col lg={4} md={5}>
      <Card className="p-3 shadow-sm rounded-3 mt-1 w-100">
        <Form>
        <h6>
      Booking Code:{' '}
      <a href="#">
        6723y2GHK
      </a>
    </h6>

    <div className="mt-4">
      <Row>
        <Col xs={8}>
          <div>
            <span>
              <strong>07:00</strong>
            </span>
            <br />
            <span>3 Maret 2023</span>
          </div>
        </Col>
        <Col xs={4} className="text-end align-self-start">
          <p className="text-muted">Keberangkatan</p>
        </Col>
        <span>Soekarno Hatta - Terminal 1A Domestik</span>
      </Row>
      <hr />
      <Row>
        <Col xs={2}>
          <img src="" alt="airline-logo" />
        </Col>
        <Col xs={10}>
          <p>
            <strong>Jet Air - Economy</strong> <br />
            JT - 203
          </p>
          <p>
            <strong>Informasi:</strong> <br />
            Baggage 20 kg <br />
            Cabin baggage 7 kg <br />
            In-Flight Entertainment
          </p>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col xs={8}>
          <div>
            <span>
              <strong>11:00</strong>
            </span>
            <br />
            <span>3 Maret 2023</span>
          </div>
        </Col>
        <Col xs={4} className="text-end align-self-start">
          <p className="text-muted">Kedatangan</p>
        </Col>
        <span>Melbourne International Airport</span>
      </Row>
      <hr />
    </div>

    <div className="mt-4">
      <p>
        2 Adults <span>IDR 9.550.000</span> <br />
        1 Baby <span>IDR 0</span> <br />
        Tax <span>IDR 300.000</span>
      </p>
      <hr />
      <h5>
        Total <span>IDR 9.850.000</span>
      </h5>
    </div>
        </Form>
      </Card>
  </Col>
  );
};

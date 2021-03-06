package com.projet.cloudmobile.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;

@Document(collection = "notification")
public class Notification implements Serializable {

    @Id
    private Integer id;
    private Integer iduser;
    private String description;

    private String date;

    public Notification(){

    }

    public Notification(Integer iduser, String description, String date) {
        this.iduser = iduser;
        this.description = description;
        this.date = date;
    }

    public Notification(Integer id, Integer iduser, String description, String date) {
        this.id = id;
        this.iduser = iduser;
        this.description = description;
        this.date = date;
    }

    public Integer getIduser() {
        return iduser;
    }

    public void setIduser(Integer iduser) {
        this.iduser = iduser;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

}